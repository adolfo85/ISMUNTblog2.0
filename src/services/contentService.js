import { supabase } from './supabaseClient'
import defaultContentData from '../data/content.json'

const STORAGE_KEY = 'ismunt_content'

export const contentService = {
  // Get all content
  async getAll() {
    try {
      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from('content')
        .select('*')

      if (error) throw error

      if (data && data.length > 0) {
        // Transform array back to object structure
        const content = { ...defaultContentData }
        data.forEach(item => {
          if (item.section && item.data) {
            content[item.section] = item.data
          }
        })

        // Update local storage as backup/cache
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
        return content
      }
    } catch (error) {
      console.warn('Error fetching from Supabase, falling back to local storage:', error)
    }

    // Fallback to localStorage or default
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultContentData, ...JSON.parse(stored) }
    }
    return defaultContentData
  },

  // Save entire content (helper, though we usually save by section)
  async save(content) {
    // Save to local storage immediately for UI responsiveness
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))

    // Save sections to Supabase
    const sections = ['home', 'materias']

    for (const section of sections) {
      if (content[section]) {
        await this.updateSection(section, content[section])
      }
    }
  },

  // Update specific section
  async updateSection(section, data) {
    // Update local
    const currentAll = this.getLocalContent()
    currentAll[section] = data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentAll))

    // Update Supabase
    try {
      const { error } = await supabase
        .from('content')
        .upsert({ section, data }, { onConflict: 'section' })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving to Supabase:', error)
      throw error
    }
  },

  // Update materia (helper wrapper around updateSection)
  async updateMateria(materiaId, data) {
    const content = await this.getAll()
    if (content.materias) {
      content.materias[materiaId] = { ...content.materias[materiaId], ...data }
      await this.updateSection('materias', content.materias)
      return content.materias[materiaId]
    }
    return null
  },

  // Get specific materia
  async getMateria(materiaId) {
    const content = await this.getAll()
    if (content.materias && content.materias[materiaId]) {
      return content.materias[materiaId]
    }
    return null
  },

  // Get specific section
  async getSection(section) {
    const content = await this.getAll()
    return content[section] || null
  },

  // Helper to get content synchronously from local storage (for initial renders if needed)
  getLocalContent() {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...defaultContentData, ...JSON.parse(stored) } : defaultContentData
  },

  // Reset to defaults
  async reset() {
    await this.save(defaultContentData)
    return defaultContentData
  },

  // Export content (still useful for backup)
  async exportContent() {
    const content = await this.getAll()
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "content.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
}

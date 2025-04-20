import fs from 'fs'
import path from 'path'

export interface Project {
  id: string
  title: string
  poster: string
  images: string[]
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), 'public/projects')
  
  try {
    const projects: Project[] = []
    const projectFolders = await fs.promises.readdir(projectsDir)

    for (const folder of projectFolders) {
      const folderPath = path.join(projectsDir, folder)
      const stats = await fs.promises.stat(folderPath)
      
      if (stats.isDirectory()) {
        const files = await fs.promises.readdir(folderPath)
        const images = files.filter(file => 
          /\.(jpg|jpeg|png|gif)$/i.test(file)
        )
        
        const poster = images.find(img => 
          img.toLowerCase().includes('poster')
        ) || images[0]

        projects.push({
          id: folder,
          title: folder.replace(/-/g, ' '),
          poster: `/projects/${folder}/${poster}`,
          images: images.map(img => `/projects/${folder}/${img}`)
        })
      }
    }
    
    return projects
  } catch (error) {
    console.error('Error loading projects:', error)
    return []
  }
} 
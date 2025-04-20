import { getProjects } from '@/app/utils/projectLoader'
import { NextResponse } from 'next/server'

export async function GET() {
  const projects = await getProjects()
  return NextResponse.json(projects)
} 
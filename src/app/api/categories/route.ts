import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where:   { isActive: true },
      include: {
        children: {
          where:   { isActive: true },
          include: { _count: { select: { products: { where: { isActive: true } } } } },
          orderBy: { sortOrder: 'asc' },
        },
        _count: { select: { products: { where: { isActive: true } } } },
      },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('GET /api/categories error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, slug, description, image, parentId, sortOrder, isActive, metaTitle, metaDesc } =
      await request.json()

    const category = await prisma.category.create({
      data: { name, slug, description, image, parentId, sortOrder: sortOrder ?? 0, isActive: isActive ?? true, metaTitle, metaDesc },
    })

    return NextResponse.json({ category }, { status: 201 })
  } catch (error: unknown) {
    console.error('POST /api/categories error:', error)
    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

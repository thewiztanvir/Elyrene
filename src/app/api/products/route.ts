import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category    = searchParams.get('category')
    const search      = searchParams.get('search') || ''
    const minPrice    = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice    = parseFloat(searchParams.get('maxPrice') || '9999999')
    const featured    = searchParams.get('featured') === 'true'
    const newArrival  = searchParams.get('newArrival') === 'true'
    const bestSeller  = searchParams.get('bestSeller') === 'true'
    const sort        = searchParams.get('sort') || 'createdAt_desc'
    const page        = parseInt(searchParams.get('page') || '1')
    const limit       = parseInt(searchParams.get('limit') || '12')
    const skip        = (page - 1) * limit

    const [sortField, sortDir] = sort.split('_')
    const orderBy: Record<string, 'asc' | 'desc'> = {
      [sortField === 'price' ? 'price' : 'createdAt']: sortDir === 'asc' ? 'asc' : 'desc',
    }

    const where: Record<string, unknown> = {
      isActive: true,
      price:    { gte: minPrice, lte: maxPrice },
    }
    if (search)      where['name'] = { contains: search, mode: 'insensitive' }
    if (category)    where['category'] = { slug: category }
    if (featured)    where['isFeatured'] = true
    if (newArrival)  where['isNewArrival'] = true
    if (bestSeller)  where['isBestSeller'] = true

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images:   { orderBy: { sortOrder: 'asc' }, take: 1 },
          category: { select: { name: true, slug: true } },
          reviews:  { select: { rating: true }, where: { isApproved: true } },
          _count:   { select: { reviews: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    const formattedProducts = products.map((p) => ({
      id:          p.id,
      name:        p.name,
      slug:        p.slug,
      price:       p.price,
      comparePrice:p.comparePrice,
      sku:         p.sku,
      image:       p.images[0]?.url ?? null,
      category:    p.category,
      stockQty:    p.stockQty,
      isFeatured:  p.isFeatured,
      isNewArrival:p.isNewArrival,
      isBestSeller:p.isBestSeller,
      isLimitedEd: p.isLimitedEd,
      avgRating:   p.reviews.length
        ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
        : 0,
      reviewCount: p._count.reviews,
    }))

    return NextResponse.json({
      products: formattedProducts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name, slug, description, longDesc, sku, price, comparePrice, costPrice,
      categoryId, stockQty, lowStockAt, isActive, isFeatured, isNewArrival,
      isBestSeller, isLimitedEd, material, origin, weight, metaTitle, metaDesc,
      tags, images, variants,
    } = body

    const product = await prisma.product.create({
      data: {
        name, slug, description, longDesc, sku, price, comparePrice, costPrice,
        categoryId, stockQty: stockQty ?? 0, lowStockAt: lowStockAt ?? 5,
        isActive: isActive ?? true, isFeatured: isFeatured ?? false,
        isNewArrival: isNewArrival ?? false, isBestSeller: isBestSeller ?? false,
        isLimitedEd: isLimitedEd ?? false, material, origin, weight,
        metaTitle, metaDesc, tags,
        images: images ? {
          create: images.map((img: { url: string; alt?: string; sortOrder?: number; isPrimary?: boolean }, i: number) => ({
            url: img.url, alt: img.alt, sortOrder: img.sortOrder ?? i, isPrimary: i === 0,
          })),
        } : undefined,
        variants: variants ? {
          create: variants.map((v: { name: string; value: string; type: string; price?: number; stock?: number; sku?: string }) => ({
            name: v.name, value: v.value, type: v.type, price: v.price, stock: v.stock ?? 0, sku: v.sku,
          })),
        } : undefined,
      },
      include: { images: true, variants: true },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error: unknown) {
    console.error('POST /api/products error:', error)
    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'SKU or slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

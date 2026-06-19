import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const slides = await db.collection('heroSlides').find().sort({ order: 1 }).toArray()
    return NextResponse.json(slides)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const count = await db.collection('heroSlides').countDocuments()
    const result = await db.collection('heroSlides').insertOne({ ...body, order: count })
    return NextResponse.json({ _id: result.insertedId }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create hero slide' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { _id, ...update } = body
    await db.collection('heroSlides').updateOne({ _id: new ObjectId(_id) }, { $set: update })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero slide' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    await db.collection('heroSlides').deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete hero slide' }, { status: 500 })
  }
}

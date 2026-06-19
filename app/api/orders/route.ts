import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const orders = await db.collection('orders').find().sort({ date: -1 }).toArray()
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const order = {
      ...body,
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString('fa-IR'),
      status: 'pending',
      createdAt: new Date(),
    }
    const result = await db.collection('orders').insertOne(order)
    return NextResponse.json({ _id: result.insertedId, id: order.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { _id, ...update } = body
    await db.collection('orders').updateOne({ _id: new ObjectId(_id) }, { $set: update })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

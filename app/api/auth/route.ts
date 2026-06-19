import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { email, password, action, name, phone } = await request.json()

    if (action === 'register') {
      const existing = await db.collection('users').findOne({ email })
      if (existing) {
        return NextResponse.json({ error: 'ایمیل قبلاً ثبت شده است' }, { status: 400 })
      }
      const result = await db.collection('users').insertOne({
        name,
        email,
        phone,
        password,
        createdAt: new Date(),
      })
      return NextResponse.json({
        _id: result.insertedId,
        name,
        email,
        phone,
      }, { status: 201 })
    }

    if (action === 'login') {
      const user = await db.collection('users').findOne({ email, password })
      if (!user) {
        return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است' }, { status: 401 })
      }
      return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

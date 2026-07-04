import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { signToken } from '@/lib/jwt'

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
        role: 'user',
        createdAt: new Date(),
      })
      return NextResponse.json({
        _id: result.insertedId,
        name,
        email,
        phone,
        role: 'user',
      }, { status: 201 })
    }

    if (action === 'login') {
      const user = await db.collection('users').findOne({ email, password })
      if (!user) {
        return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است' }, { status: 401 })
      }

      const role = user.role || 'user'
      const token = await signToken({ email: user.email, role })

      const response = NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role,
      })

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      return response
    }

    if (action === 'logout') {
      const response = NextResponse.json({ success: true })
      response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      })
      return response
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

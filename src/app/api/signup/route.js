// app/api/signup/route.js
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    const body = await req.json()
    const { fullName, email, password, hospitalName, role } = body

    if (!fullName || !email || !password || !hospitalName || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Ensure hospital exists (by name)
    const hospital = await prisma.hospital.upsert({
      where: { name: hospitalName },
      update: {},
      create: {
        name: hospitalName,
        region: "Unknown",
        administratorName: fullName,
      },
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: role.toUpperCase(), // "executive" -> "EXECUTIVE"
        hospitalId: hospital.id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        hospitalId: true,
      },
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

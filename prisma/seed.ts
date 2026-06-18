import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  // 0. Create Admin User
  await prisma.user.upsert({
    where: { email: 'admin@aurabeautylounge.in' },
    update: {},
    create: {
      name: 'Aura Admin',
      email: 'admin@aurabeautylounge.in',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    }
  });

  // 1. Create Staff
  await prisma.user.upsert({
    where: { email: 'priya@aurabeautylounge.in' },
    update: {},
    create: {
      name: 'Priya Sharma',
      email: 'priya@aurabeautylounge.in',
      password: hashedPassword,
      role: 'STAFF',
      staff: {
        create: {
          specialty: 'Senior Hair Stylist',
          bio: '10 years of experience in advanced coloring and cuts.',
          availability: {
            create: [
              { dayOfWeek: 1, startTime: '10:00', endTime: '20:00' }, // Monday
              { dayOfWeek: 2, startTime: '10:00', endTime: '20:00' }, // Tuesday
              { dayOfWeek: 3, startTime: '10:00', endTime: '20:00' }, // Wednesday
              { dayOfWeek: 4, startTime: '10:00', endTime: '20:00' }, // Thursday
              { dayOfWeek: 5, startTime: '10:00', endTime: '20:00' }, // Friday
              { dayOfWeek: 6, startTime: '10:00', endTime: '20:00' }, // Saturday
            ]
          }
        }
      }
    }
  })

  // 2. Create Service Categories
  const hairCategory = await prisma.serviceCategory.create({
    data: { name: 'Hair Care & Styling' }
  })
  
  const bridalCategory = await prisma.serviceCategory.create({
    data: { name: 'Bridal Studio' }
  })

  // 3. Create Services
  await prisma.service.create({
    data: {
      categoryId: hairCategory.id,
      name: 'Luxury Balayage',
      description: 'Hand-painted highlights for a natural, sun-kissed look.',
      price: 4999.00,
      durationMins: 120,
      bufferMins: 15,
      cleanupMins: 15
    }
  })

  await prisma.service.create({
    data: {
      categoryId: bridalCategory.id,
      name: 'The Royal Canvas (HD Makeup)',
      description: 'Premium HD makeup package for the modern bride.',
      price: 14999.00,
      durationMins: 180,
      bufferMins: 30,
      cleanupMins: 30
    }
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

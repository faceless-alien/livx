/**
 * Database schema push script
 * Initializes Payload which triggers automatic schema creation with push: true
 */
import { getPayload } from 'payload'
import config from '../src/payload/payload.config.js'

async function main() {
  console.log('Initializing Payload to push database schema...')
  
  try {
    const payload = await getPayload({ config })
    
    console.log('✓ Database schema pushed successfully!')
    console.log('✓ Payload initialized - tables should now exist')
    
    // Give it a moment to finish any async operations
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    process.exit(0)
  } catch (error) {
    console.error('Failed to push database schema:', error)
    process.exit(1)
  }
}

main()

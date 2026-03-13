'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in real apps, use a validation library like zod
  const data = {
    email: formData.get('email') as string,
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login?sent=true')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in real apps, use a validation library like zod
  const data = {
    email: formData.get('email') as string,
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: 'dummy-password-for-magic-link-signup', // Supabase needs a password or a different method
  })

  // Magic link is better for "Idea to structure" vibe
  // But let's stick to simple OTP/Magic Link as per spec
  return login(formData)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url)
  }
}

export async function signInWithGithub() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url)
  }
}

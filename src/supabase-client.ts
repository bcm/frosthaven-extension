import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key missing. Check .env file.');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

export async function supabaseLoad(userId: string, campaignKey: string): Promise<number[]> {
  const { data, error } = await supabase
    .from('scenario_backlogs')
    .select('ordering')
    .eq('user_id', userId)
    .eq('campaign_key', campaignKey)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows found
      return [];
    }
    console.error('Error loading backlog:', error);
    return [];
  }

  const ordering = data?.ordering as unknown;
  return Array.isArray(ordering) ? (ordering as number[]) : [];
}

export async function supabaseSave(
  userId: string,
  campaignKey: string,
  ordering: number[]
): Promise<void> {
  const { error } = await supabase.from('scenario_backlogs').upsert(
    {
      user_id: userId,
      campaign_key: campaignKey,
      ordering: ordering,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id, campaign_key' }
  );

  if (error) {
    console.error('Error saving backlog:', error);
    throw error;
  }
}

export async function supabaseEnsureSession(): Promise<void> {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    // Logic to trigger login if needed, or just return
    console.log('No active session');
  }
}

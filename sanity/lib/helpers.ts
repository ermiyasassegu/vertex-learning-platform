/**
 * Formats duration in seconds into a friendly human readable string,
 * e.g., 754 -> "12m 34s", 3720 -> "1h 02m", 66240 -> "18h 24m".
 */
export function formatDuration(seconds?: number): string {
  if (!seconds || seconds <= 0) return '0m'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }

  if (minutes > 0) {
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds.toString().padStart(2, '0')}s`
      : `${minutes}m`
  }

  return `${remainingSeconds}s`
}

/**
 * Formats duration in seconds into timestamp format for video players (e.g. 12:34 or 1:02:15).
 */
export function formatTimestamp(seconds?: number): string {
  if (!seconds || seconds <= 0) return '0:00'

  const totalSecs = Math.floor(seconds)
  const hours = Math.floor(totalSecs / 3600)
  const minutes = Math.floor((totalSecs % 3600) / 60)
  const secs = totalSecs % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Derives a human-readable module label from 0-based array index (e.g., 0 -> "Module 1").
 */
export function deriveModuleLabel(moduleIndex: number): string {
  return `Module ${moduleIndex + 1}`
}

/**
 * Derives a human-readable lesson label from module and lesson 0-based array indices
 * (e.g., moduleIndex 4, lessonIndex 0 -> "Lesson 5.1").
 */
export function deriveLessonLabel(moduleIndex: number, lessonIndex: number): string {
  return `Lesson ${moduleIndex + 1}.${lessonIndex + 1}`
}

import Eye from '@/assets/icons/eye.svg'
import EyeOff from '@/assets/icons/eye_off.svg'
import Spinner from '@/assets/icons/spinner.svg'

export const ICONS = {
    eye: Eye,
    eye_off: EyeOff,
    spinner: Spinner
} as const

export type IconName = keyof typeof ICONS;
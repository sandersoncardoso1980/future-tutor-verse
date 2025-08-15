
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Sobrescrever cores padrão do Tailwind que podem causar amarelo
				yellow: {
					50: '210 40% 98%',
					100: '210 40% 96%',
					200: '214 32% 91%',
					300: '213 27% 84%',
					400: '215 20% 65%',
					500: '220 9% 46%',
					600: '215 14% 34%',
					700: '217 19% 27%',
					800: '215 28% 17%',
					900: '221 39% 11%',
				},
				amber: {
					50: '210 40% 98%',
					100: '210 40% 96%',
					200: '214 32% 91%',
					300: '213 27% 84%',
					400: '215 20% 65%',
					500: '220 9% 46%',
					600: '215 14% 34%',
					700: '217 19% 27%',
					800: '215 28% 17%',
					900: '221 39% 11%',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Paleta complementar moderna - cores em formato HSL sem wrapper
				blue: {
					50: '215 100% 97%',
					100: '214 95% 93%', 
					200: '213 97% 87%',
					300: '212 96% 78%',
					400: '213 94% 68%',
					500: '217 91% 60%',
					600: '221 83% 53%',
					700: '224 76% 48%',
					800: '226 71% 40%',
					900: '224 64% 33%',
				},
				indigo: {
					50: '226 100% 97%',
					100: '226 100% 94%',
					200: '228 96% 89%',
					300: '230 94% 82%',
					400: '234 89% 74%',
					500: '239 84% 67%',
					600: '243 75% 59%',
					700: '245 58% 51%',
					800: '244 55% 41%',
					900: '242 47% 34%',
				},
				violet: {
					50: '250 100% 98%',
					100: '251 91% 95%',
					200: '251 95% 85%',
					300: '252 95% 85%',
					400: '255 92% 76%',
					500: '262 83% 58%',
					600: '263 70% 50%',
					700: '263 69% 42%',
					800: '263 69% 42%',
					900: '264 67% 35%',
				},
				emerald: {
					50: '151 81% 96%',
					100: '149 80% 90%',
					200: '152 76% 80%',
					300: '156 72% 67%',
					400: '158 64% 52%',
					500: '160 84% 39%',
					600: '161 94% 30%',
					700: '163 94% 24%',
					800: '163 88% 20%',
					900: '164 86% 16%',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			},
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'display': ['Poppins', 'system-ui', 'sans-serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

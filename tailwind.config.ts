
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
				// Paleta complementar moderna
				blue: {
					50: 'hsl(215 100% 97%)',
					100: 'hsl(214 95% 93%)', 
					200: 'hsl(213 97% 87%)',
					300: 'hsl(212 96% 78%)',
					400: 'hsl(213 94% 68%)',
					500: 'hsl(217 91% 60%)',
					600: 'hsl(221 83% 53%)',
					700: 'hsl(224 76% 48%)',
					800: 'hsl(226 71% 40%)',
					900: 'hsl(224 64% 33%)',
				},
				indigo: {
					50: 'hsl(226 100% 97%)',
					100: 'hsl(226 100% 94%)',
					200: 'hsl(228 96% 89%)',
					300: 'hsl(230 94% 82%)',
					400: 'hsl(234 89% 74%)',
					500: 'hsl(239 84% 67%)',
					600: 'hsl(243 75% 59%)',
					700: 'hsl(245 58% 51%)',
					800: 'hsl(244 55% 41%)',
					900: 'hsl(242 47% 34%)',
				},
				violet: {
					50: 'hsl(250 100% 98%)',
					100: 'hsl(251 91% 95%)',
					200: 'hsl(251 95% 85%)',
					300: 'hsl(252 95% 85%)',
					400: 'hsl(255 92% 76%)',
					500: 'hsl(262 83% 58%)',
					600: 'hsl(263 70% 50%)',
					700: 'hsl(263 69% 42%)',
					800: 'hsl(263 69% 42%)',
					900: 'hsl(264 67% 35%)',
				},
				emerald: {
					50: 'hsl(151 81% 96%)',
					100: 'hsl(149 80% 90%)',
					200: 'hsl(152 76% 80%)',
					300: 'hsl(156 72% 67%)',
					400: 'hsl(158 64% 52%)',
					500: 'hsl(160 84% 39%)',
					600: 'hsl(161 94% 30%)',
					700: 'hsl(163 94% 24%)',
					800: 'hsl(163 88% 20%)',
					900: 'hsl(164 86% 16%)',
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

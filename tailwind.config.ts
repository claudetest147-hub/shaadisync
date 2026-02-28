import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			heading: ['var(--font-outfit)'],
  			body: ['var(--font-dm-sans)'],
  		},
  		colors: {
  			burgundy: {
  				DEFAULT: '#8B1A4A',
  				50: '#F8E8EF',
  				100: '#EFC8DA',
  				200: '#E5A8C5',
  				300: '#DB88B0',
  				400: '#D1689B',
  				500: '#8B1A4A',
  				600: '#77163F',
  				700: '#631234',
  				800: '#4F0E29',
  				900: '#3B0A1E',
  			},
  			cream: {
  				DEFAULT: '#FFF8F0',
  				50: '#FFFFFF',
  				100: '#FFF8F0',
  			},
  			gold: {
  				DEFAULT: '#C9A84C',
  				50: '#F9F6EB',
  				100: '#F1EAD0',
  				200: '#E8DEB5',
  				300: '#E0D29A',
  				400: '#D8C67F',
  				500: '#C9A84C',
  				600: '#B08E39',
  				700: '#977426',
  				800: '#7E5A13',
  				900: '#654000',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: '16px',
  			md: '12px',
  			sm: '8px'
  		},
  		animation: {
  			'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  		},
  		keyframes: {
  			'scale-in': {
  				'0%': { transform: 'scale(0.95)', opacity: '0' },
  				'100%': { transform: 'scale(1)', opacity: '1' },
  			},
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve('src')
		},
		extensions: ['.jsx', '.js', '.ts', '.tsx']
	},
	plugins: [
		AutoImport({
			imports: [
				'react',
				'react-i18next',
				'react-router-dom',
				// 'ahooks',
				{
					'@ebay/nice-modal-react': [
						['create', 'niceModalCreate'],
						['register', 'niceModalRegister'],
						['useModal', 'niceModalUseModal'],
						['show', 'niceModalShow'],
						['hide', 'niceModalHide']
					],
					'date-fns': [
						'format',
						'getTime',
						'addMinutes',
						'addSeconds',
						'addDays',
						'addMilliseconds',
						'differenceInDays',
						'startOfDay',
						'startOfToday',
						'getDay',
						'endOfDay',
						'isAfter',
						'isBefore',
						'isSameDay',
						'subMonths',
						'subDays'
					],
					'@emotion/styled': [['default', 'styled']],
					ahooks: ['useRequest']
				}
			],
			dts: './src/@types/auto-imports.d.ts',
			dirs: [
				'src/store',
				'src/routers',
				'src/hooks',
				'src/i18n',
				'src/api',
				'src/utils'
			]
		}),
		react()
	],
	esbuild: {
		// drop: ['console', 'debugger'],
	}
})

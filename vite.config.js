import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    ViteEjsPlugin({}, {
      ejs: {
        views: [resolve(__dirname)]
      }
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        search: resolve(__dirname, 'search.html'),
        downloads: resolve(__dirname, 'downloads.html'),
        'academics/laboratories': resolve(__dirname, 'academics/laboratories.html'),
        'academics/management': resolve(__dirname, 'academics/management.html'),
        'academics/ms-ai': resolve(__dirname, 'academics/ms-ai.html'),
        'academics/phd': resolve(__dirname, 'academics/phd.html'),
        'academics/postgraduate': resolve(__dirname, 'academics/postgraduate.html'),
        'academics/undergraduate': resolve(__dirname, 'academics/undergraduate.html'),
        'contact/alumni': resolve(__dirname, 'contact/alumni.html'),
        'contact/contacts': resolve(__dirname, 'contact/contacts.html'),
        'contact/faculty': resolve(__dirname, 'contact/faculty.html'),
        'contact/helpdesk': resolve(__dirname, 'contact/helpdesk.html'),
        'faculty/collaborations': resolve(__dirname, 'faculty/collaborations.html'),
        'faculty/labs': resolve(__dirname, 'faculty/labs.html'),
        'faculty/members': resolve(__dirname, 'faculty/members.html'),
        'faculty/news': resolve(__dirname, 'faculty/news.html'),
        'faculty/projects': resolve(__dirname, 'faculty/projects.html')
      }
    }
  }
});

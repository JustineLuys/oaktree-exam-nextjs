# 🌳 Oaktree Exam — Next.js Web Application

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + `clsx` + `tailwind-merge`
- **Form Handling**: React Hook Form + Zod Validation
- **UI Components**: ShadCN UI + Lucide Icons + Sonner for notifications
- **Authentication**: JWT from FastAPI
- **Utilities**:

---

## 📁 Project Structure

/app/(marketing)/page.tsx → Main Page
/app/(auth)/... → Auth Page
/components → Reusable components (Sidebar, Buttons, Dialogs, etc.)
/lib → Server utility functions (e.g., fetchItems)
/public → Static assets (images, icons, etc.)
/styles → Tailwind & global CSS

---

## 📦 Installation

git clone https://github.com/JustineLuys/oaktree-exam-nextjs.git
cd oaktree-exam-nextjs
npm install to install dependencies,
npm run dev to run the app

## Server Actions

Server actions are used to communicate to the backend API (Python Fast API) to
maximize the use of revalidatePath and redirection

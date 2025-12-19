{[{# BCard – פרויקט React + TypeScript
    
אפליקציה להצגת וניהול כרטיסי ביקור (Business Cards) עם התחברות/הרשמה, יצירה/עדכון/מחיקה של כרטיסים (CRUD), ומועדפים (Favorites).
    
## מה יש במערכת
    
- **דפים (Routes):**
    
`/home` – רשימת כרטיסים + פעולות (לפי הרשאות)
- `/login` – התחברות (JWT)
- `/register` – הרשמה (כולל Business User)
- `/favorites` – כרטיסים במועדפים
`/myCards` – הכרטיסים שלי (לביזנס/אדמין)
`/admin` – אזור ניסויים/ניהול (לאדמין)
- `/about` – אודות
    
- **UX וטכנולוגיות:**
React + TypeScript
- React Router
React-Bootstrap
- Formik + Yup לטפסים וולידציה
Toast notifications (react-toastify)
    
## התממשקות ל־API ואימות (JWT)
    
- אחרי התחברות (`Login`) השרת מחזיר **JWT**.
- הטוקן נשמר כ־`sessionStorage.token`.
- בנוסף נשמרים:
`sessionStorage.userDetails` – תוכן מפוענח מהטוקן (לדוגמה `isAdmin`, `isBusiness`, `_id`)
`sessionStorage.userId`
    
### axiosConfig (אחראי על אימות אוטומטי)
    
הקובץ `src/Services/axiosConfig.ts` יוצר axios instance שמוסיף לפני כל בקשה headers של הרשאה (אם יש token):
    
- `x-auth-token: <token>`
- `Authorization: Bearer <token>`
    
בנוסף, אם חוזרת שגיאת הרשאה (`401/403`) הוא מסמן את השגיאה כדי שה־UI יוכל להציג הודעה אחידה.
    
> טיפ: אם אתה מקבל `403` ביצירת כרטיס, זה בדרך כלל אומר שהמשתמש מחובר אבל **אין לו הרשאת Business/Admin** או שה־API של users/cards לא על אותו שרת.
    
## מועדפים (Favorites)
    
המועדפים נשמרים ב־`localStorage` לפי משתמש (מפתח בסגנון):
`favorites:<userId>`
    
הסיבה לכך: בחלק מה־APIs המארחים לא מאפשרים לעדכן `likes` ב־PUT, לכן המועדפים נשמרים מקומית.
    
## מבנה הפרויקט (בקצרה)
    
- `src/App.tsx` – הגדרת Routes
- `src/components/*` – דפים ו־UI (Home/Login/Register/…)
- `src/Services/*` – שכבת קריאות לשרת (Users/Cards + axiosConfig)
- `src/Interfaces/*` – טיפוסים (Card/User/Product)
    
שירותים עיקריים:
    
- `src/Services/UserService.ts` – register/login + פעולות משתמש
- `src/Services/CardService.ts` – CRUD לכרטיסים
    
## איך מריצים
    
1. התקנת תלותיות:
    
```bash
npm install
```
    
2. הרצה בפיתוח:
    
```bash
npm start
```
    
3. בנייה לפרודקשן:
    
```bash
npm run build
```
    
## הגדרות ENV (אופציונלי)
    
כדי לעבוד מול API מרוחק, מגדירים משתני סביבה (לדוגמה בקובץ `.env`):
    
- `REACT_APP_API_USERS=".../users"`
- `REACT_APP_API_CARDS=".../cards"`
    
חשוב: מומלץ שה־Users וה־Cards יהיו על **אותו דומיין/שרת**, כדי שה־token יהיה תקף לשניהם.
    
}]}
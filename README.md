# Project - BCard 🪪

אפליקציית Web מבוססת React ו־TypeScript לניהול כרטיסי ביקור דיגיטליים, הכוללת מערכת התחברות והרשמה, ניהול הרשאות לפי תפקיד, פעולות CRUD מלאות, וניהול מועדפים.

הפרויקט מדגים ארכיטקטורה נקייה, אימות מבוסס JWT, ופתרון פרקטי בצד הלקוח עם שימוש ב API .

---

## 🚀 פיצ'רים מרכזיים

- התחברות והרשמה למשתמשים (JWT)
- ניהול הרשאות לפי תפקיד (User / Business / Admin)
- יצירה, צפייה, עריכה ומחיקה (CRUD) של כרטיסי ביקור
- ניהול מועדפים לכל משתמש
- אזור ניהול ייעודי לאדמין
- ממשק רספונסיבי באמצעות React-Bootstrap
- טפסים עם וולידציה (Formik + Yup)
- הודעות מערכת (Toast Notifications)

---

## 🧭 Routes

| נתיב         | תיאור                                             |
| ------------ | ------------------------------------------------- |
| `/home`      | הצגת כל כרטיסי הביקור עם פעולות לפי הרשאות המשתמש |
| `/login`     | התחברות למערכת (JWT)                              |
| `/register`  | הרשמה למערכת, כולל משתמשים עסקיים                 |
| `/favorites` | כרטיסים שסומנו כמועדפים                           |
| `/myCards`   | כרטיסים של המשתמש המחובר (Business / Admin בלבד)  |
| `/admin`     | אזור ניהול / ניסויים (Admin בלבד)                 |
| `/about`     | דף אודות                                          |

---

## 🛠 טכנולוגיות

- **Frontend:** React, TypeScript ,HTML ,CSS
- **Routing:** React Router
- **UI:** React-Bootstrap , FontAwesome, Google-Fonts
- **Forms & Validation:** Formik, Yup
- **HTTP Client:** Axios
- **Notifications:** react-toastify
- **Authentication:** JSON Web Tokens (JWT)

---

## 🔐 אימות והרשאות

לאחר התחברות מוצלחת, השרת מחזיר **JWT**.

### Session Storage

הנתונים הבאים נשמרים ב־`sessionStorage`:

- `token` – טוקן ה־JWT לצורך בקשות מאובטחות
- `userDetails` – מידע מפוענח מהטוקן (`_id`, `isAdmin`, `isBusiness`)
- `userId` – מזהה המשתמש המחובר

---

## 🌐 הגדרת Axios

כל הקריאות ל־API מתבצעות דרך מופע Axios מרכזי המוגדר בקובץ:

```
src/Services/AxiosConfig.ts
```

### תפקיד הקובץ:

- הוספת headers של הרשאה אוטומטית אם קיים token:

  - `x-auth-token: <token>`
  - `Authorization: Bearer <token>`

- זיהוי שגיאות `401 / 403` לצורך טיפול אחיד בצד ה־UI

⚠️ **הערה:** שגיאת `403 Forbidden` ביצירת כרטיס לרוב מצביעה על כך שהמשתמש מחובר אך אינו מוגדר כ־Business או Admin, או ששירותי Users ו־Cards אינם פועלים על אותו שרת.

---

## ⭐ מועדפים (Favorites)

המועדפים נשמרים בצד הלקוח באמצעות `localStorage`, דרך token ללא הצגת המידע האישי - בנפרד לכל משתמש.

פורמט המפתח:

```
favorites:<userId>
```

---

## 📁 מבנה הפרויקט

```
src/
├── App.tsx              # הגדרת Routes
├── components/          # דפים וקומפוננטות UI
├── Services/            # שכבת תקשורת עם השרת
│   ├── AxiosConfig.ts
│   ├── UserService.ts
│   └── CardService.ts
├── Interfaces/          #(TypeScript Interfaces)
```

### שירותים עיקריים

- **UserService** – התחברות, הרשמה ופעולות משתמש
- **CardService** – פעולות CRUD על כרטיסי ביקור

---

## ▶️ התחלת עבודה

### התקנת תלויות

```bash
npm install
```

### הרצה במצב פיתוח

```bash
npm start
```

### בנייה לפרודקשן

```bash
npm run build
```

---

## ⚙️ משתני סביבה (בפרוייקט שלי)

לעבודה מול API מרוחק, יש להגדיר קובץ `.env ` הוא לא בפרוייקט עצמו:

```env
REACT_APP_API_USERS=.../users
REACT_APP_API_CARDS=.../cards
```


---

## 📌 הערות

הפרויקט שם דגש על:

- הפרדת אחריות ברורה
- תהליך אימות מאובטח
- התמודדות עם מגבלות API בעולם האמיתי
- ארכיטקטורת Frontend סקיילבילית ותחזוקתית ומודרנית.

---

## 👨‍💻 מחבר

פותח על ידי גיא אבן חן / DarkPulse - במסגרת לימוד React ו־TypeScript, עם דגש על תבניות עבודה מקובלות ויישום מעשי.

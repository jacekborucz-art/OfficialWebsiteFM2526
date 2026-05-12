# FM26 Admin Panel - Instrukcja Autostartu

## Aktualny Status ✅
- **Serwer**: Uruchomiony przez PM2
- **Adres**: http://localhost:5000/admin
- **Status**: Gotowy

## Wymagania
- ✅ PM2 zainstalowany globalnie
- ✅ Projekt zbudowany (dist/)
- ✅ Procesy PM2 zapisane

## Opcja 1: Autostart z Windows Task Scheduler (REKOMENDOWANA)

### Kroki:
1. Otwórz **Task Scheduler**:
   - Wciśnij `Win + R`
   - Wpisz `taskschd.msc`
   - Kliknij OK

2. W lewym panelu kliknij **Create Task** (lub "Utwórz zadanie")

3. Wypełnij formularz:
   - **Name**: FM26 Admin Server
   - **Description**: Uruchamia serwer Admin Panel FM26
   - Zaznacz: "Run whether user is logged in or not"

4. Przejdź do zakładki **Triggers**:
   - Kliknij **New**
   - Begin the task: **At log on**
   - Kliknij OK

5. Przejdź do zakładki **Actions**:
   - Kliknij **New**
   - Action: **Start a program**
   - Program/script: `C:\Windows\System32\cmd.exe`
   - Add arguments: `/c cd /d "c:\Users\Jack Cave\Documents\FM google studio\FM26PL\OfficialWebsiteFM2526" && pm2 resurrect`
   - Kliknij OK

6. Przejdź do zakładki **Settings**:
   - ✓ Allow task to be run on demand
   - ✓ If the task fails, restart every: 1 minute (optional)
   - Kliknij OK

7. Kliknij **OK** na głównym oknie

## Opcja 2: Ręczne Uruchomienie (TYMCZASOWE)

Jeśli nie chcesz autostartu, możesz uruchomić serwer ręcznie:

```powershell
cd "c:\Users\Jack Cave\Documents\FM google studio\FM26PL\OfficialWebsiteFM2526"
pm2 resurrect
```

Lub kliknij dwukrotnie: `run-admin.bat`

## Zarządzanie Serwerem

### Sprawdzenie statusu:
```powershell
pm2 list
```

### Przejrzenie logów:
```powershell
pm2 logs fm26-admin
```

### Zatrzymanie serwera:
```powershell
pm2 stop fm26-admin
```

### Uruchomienie serwera:
```powershell
pm2 start fm26-admin
```

### Restart serwera:
```powershell
pm2 restart fm26-admin
```

## Workflow: Admin Panel -> News.json -> Git

1. 🌐 Otwórz Admin Panel: http://localhost:5000/admin
2. 📝 Zaloguj się (hasło: `admin123`)
3. ➕ Dodaj/edytuj newsy
4. 💾 Kliknij "Zapisz"
5. 📄 Plik `src/data/news.json` się automatycznie aktualizuje
6. 🔄 Github Desktop lub Git CLI automatycznie wykryje zmianę
7. 📤 Zcommituj i pushuj do repozytorium

## Troubleshooting

### Błąd: "serwer nie odpowiada"
- Sprawdź czy PM2 proces jest uruchomiony: `pm2 list`
- Uruchom: `pm2 resurrect` lub kliknij `run-admin.bat`

### Błąd: "Nie udało się załadować newsów"
- Sprawdź logi: `pm2 logs fm26-admin`
- Upewnij się, że plik `src/data/news.json` istnieje

### Newsy nie zapisują się
- Sprawdź uprawnienia do folderu `src/data/`
- Sprawdź czy serwer jest uruchomiony
- Przejrzyj logi: `pm2 logs fm26-admin`

## Notatki
- Hasło do Admin Panel: `admin123`
- Serwer nasłuchuje na porcie **5000**
- PM2 automatycznie restartuje serwer jeśli się zawali
- Zmiany w `news.json` są natychmiastowe - nie trzeba przebudowywać projektu

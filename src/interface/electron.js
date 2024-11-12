const { app, BrowserWindow } = require('electron');
const path = require("path");
const fs = require("fs");

app.applicationMenu = null;
app.whenReady().then(() => {
    /**
     * @description
     * Erstellt ein Electron-Fenster
     *
     * creates an clectron window
     *
     * @author ItsLeMax
     *
     * @param movable
     * Soll das Fenster bewegbar sein?
     *
     * should the window be movable?
     *
     * @returns
     * Fenster mit Discord
     *
     * window with Discord
     */
    const createWindow = (movable) => {
        const window = new BrowserWindow({
            width: 1920,
            height: 1080 / 2 - 20,
            movable: movable,
            frame: movable,
            minimizable: movable,
            maximizable: movable,
            resizable: false,
            icon: path.join(__dirname, "../img/icon.png"),
        });

        window.loadURL(JSON.parse(fs.readFileSync(path.join(__dirname, "config.json"))).baseUrl);

        window.on("closed", () => {
            app.quit();
        });

        return window;
    }

    const mainWindow = createWindow(true);

    /**
     * @description
     * Addiert die Hauptfensterbreite auf dessen Position
     *
     * adds the main windows width onto its position
     *
     * @author ItsLeMax
     *
     * @returns
     * Neue `y`-Koordinate
     *
     * new `y` coordinate
     */
    const y = () => mainWindow.getPosition()[1] + mainWindow.getBounds().height;
    /** @see y — Ähnliche Funktion / similar function */
    const x = () => mainWindow.getPosition()[0];

    const secondWindow = createWindow();
    secondWindow.setPosition(x(), y());

    mainWindow.on("move", () => {
        secondWindow.setPosition(x(), y());
    });

    mainWindow.on("minimize", () => {
        secondWindow.minimize();
    })

    mainWindow.on("restore", () => {
        secondWindow.restore();
    });

    secondWindow.on("restore", () => {
        mainWindow.restore();
    })
});
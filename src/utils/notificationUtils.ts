import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
export async function requestNotificationPermission() {
    try {
        console.log("Verificando permisos de notificación...");
        let permStatus = await PushNotifications.checkPermissions();
        
        if (permStatus.receive === 'prompt') {
            console.log("Solicitando permisos de notificación...");
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive === 'granted') {
            console.log("Permiso de notificación concedido.");

            // Registrar la app para recibir notificaciones y confirmar el token
            await PushNotifications.register();

            // Crear un canal de notificación en Android (solo si es Android)
            if (Capacitor.getPlatform() === "android") {
                await PushNotifications.createChannel({
                    id: "general",
                    name: "General Notifications",
                    importance: 4,
                });
                console.log("Canal de notificación creado: 'general'");
                alert("Canal de notificación creado: 'general'");
            }

        } else {
            console.warn("Permiso de notificación no concedido.");
        }
    } catch (error) {
        console.error("Error al solicitar permiso de notificación:", error);
    }
}

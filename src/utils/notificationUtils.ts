import { PushNotifications } from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Capacitor } from "@capacitor/core";

export async function requestNotificationPermission() {
    if (!Capacitor.isNativePlatform()) {
        console.warn("El plugin PushNotifications no está implementado en la web.");
        return;
    }
    try {
        console.log("Verificando permisos de notificación...");
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
            console.log("Solicitando permisos de notificación...");
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive === 'granted') {
            console.log("Permiso de notificación concedido.");

            // Registrar la app para recibir notificaciones
            await PushNotifications.register();

            // Crear un canal de notificación en Android
            if (Capacitor.getPlatform() === "android") {
                await PushNotifications.createChannel({
                    id: "general",
                    name: "General Notifications",
                    importance: 4,
                });
                console.log("Canal de notificación creado: 'general'");
            }

            // Mostrar notificación de agradecimiento
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: "¡Gracias!",
                        body: "Gracias por aceptar las notificaciones.",
                        id: 1,
                        schedule: { at: new Date(Date.now() + 1000) },
                        channelId: "general",
                    },
                ],
            });
        } else {
            console.warn("Permiso de notificación no concedido.");
        }
    } catch (error) {
        console.error("Error al solicitar permiso de notificación:", error);
    }
}

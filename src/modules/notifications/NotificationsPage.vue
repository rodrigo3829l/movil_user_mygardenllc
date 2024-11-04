<template>
    <IonPage>
      <IonToolbar>
        <IonTitle>Notifications</IonTitle>
      </IonToolbar>
      <IonContent>
        <div class="actions text-left p-4">
          <p class="font-bold text-gray-800">Actions</p>
          <div class="flex items-center justify-between mb-4">
            <span>Delete All Notifications</span>
            <ion-icon name="trash-outline" @click="deleteAllNotifications"></ion-icon>
          </div>
          <div class="flex items-center justify-between">
            <span>Mark All as Read</span>
            <ion-icon name="checkmark-done-outline" @click="markAllAsRead"></ion-icon>
          </div>
        </div>
        <div v-if="overlay">
          <ion-progress-bar type="indeterminate"></ion-progress-bar>
        </div>
        <div>
          <NotificationComponent
            v-for="notification in notifications"
            :key="notification._id"
            :notification="notification"
            @mark-as-read="handleMarkAsRead"
            @delete-notification="handleDeleteNotification"
          />
        </div>
      </IonContent>
    </IonPage>
  </template>
  
  <script lang="ts">
  import {
    defineComponent,
    ref,
    onMounted
  } from "vue";
  import {
    IonPage,
    IonContent,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonProgressBar
  } from "@ionic/vue";
  import { Preferences } from "@capacitor/preferences";
  import NotificationComponent from "@/modules/notifications/NotificationComponent.vue";
  import api from "@/axios/axios";
  
  export default defineComponent({
    components: {
      IonPage,
      IonContent,
      IonToolbar,
      IonTitle,
      IonIcon,
      IonProgressBar,
      NotificationComponent
    },
    setup() {
      const notifications = ref([]);
      const overlay = ref(false);
  
      const fetchNotifications = async () => {
        try {
          overlay.value = true;
          const { value: token } = await Preferences.get({ key: "token" });
  
          if (!token) {
            alert("Authentication required. Please log in again.");
            return;
          }
  
          const { data } = await api({
            method: "GET",
            url: "/notifications/notifications",
            headers: {
              Authorization: "Bearer " + token,
              rol: "client",
            },
          });
  
          if (data.success) {
            notifications.value = data.notifications;
          } else {
            alert("Failed to fetch notifications");
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
          alert("An error occurred while fetching notifications");
        } finally {
          overlay.value = false;
        }
      };
  
      const handleMarkAsRead = async (notification) => {
        try {
          overlay.value = true;
          const { value: token } = await Preferences.get({ key: "token" });
  
          if (!token) {
            alert("Authentication required. Please log in again.");
            return;
          }
  
          const { data } = await api.put(`/notifications/mark/${notification._id}`);
  
          if (data.success) {
            alert("Notification marked as read");
            notification.read = true;
          } else {
            alert("Failed to mark notification as read");
          }
        } catch (error) {
          console.error("Error marking notification as read:", error);
          alert("An error occurred while marking the notification as read");
        } finally {
          overlay.value = false;
        }
      };
  
      const handleDeleteNotification = async (notification) => {
        try {
          overlay.value = true;
          const { value: token } = await Preferences.get({ key: "token" });
  
          if (!token) {
            alert("Authentication required. Please log in again.");
            return;
          }
  
          const { data } = await api.delete(`/notifications/delete/${notification._id}`);
  
          if (data.success) {
            alert("Notification deleted");
            notifications.value = notifications.value.filter((n) => n.id !== notification._id);
          } else {
            alert("Failed to delete notification");
          }
        } catch (error) {
          console.error("Error deleting notification:", error);
          alert("An error occurred while deleting the notification");
        } finally {
          overlay.value = false;
        }
      };
  
      const deleteAllNotifications = async () => {
        try {
          overlay.value = true;
          const { value: token } = await Preferences.get({ key: "token" });
  
          if (!token) {
            alert("Authentication required. Please log in again.");
            return;
          }
  
          const { data } = await api.delete("/notifications/delete-all", {
            headers: {
              Authorization: "Bearer " + token,
              rol: "client",
            },
          });
  
          if (data.success) {
            alert("All notifications deleted");
            notifications.value = [];
          } else {
            alert("Failed to delete all notifications");
          }
        } catch (error) {
          console.error("Error deleting all notifications:", error);
          alert("An error occurred while deleting all notifications");
        } finally {
          overlay.value = false;
        }
      };
  
      const markAllAsRead = async () => {
        try {
          overlay.value = true;
          const { value: token } = await Preferences.get({ key: "token" });
  
          if (!token) {
            alert("Authentication required. Please log in again.");
            return;
          }

          const { data } = await api({
          method: "PUT",
          url: "/notifications/read-all",
          headers: {
            Authorization: "Bearer " + token,
            rol: "client",
          },
        });
  
        //   const { data } = await api.put("/notifications/read-all", null, {
        //     headers: {
        //       Authorization: "Bearer " + token,
        //       rol: "client",
        //     },
        //   });
  
          if (data.success) {
            alert("All notifications marked as read");
            notifications.value.forEach((n) => (n.read = true));
          } else {
            alert("Failed to mark all notifications as read");
          }
        } catch (error) {
          console.error("Error marking all notifications as read:", error);
          alert("An error occurred while marking all notifications as read");
        } finally {
          overlay.value = false;
        }
      };
  
      onMounted(() => {
        fetchNotifications();
      });
  
      return {
        notifications,
        overlay,
        handleMarkAsRead,
        handleDeleteNotification,
        deleteAllNotifications,
        markAllAsRead,
      };
    },
  });
  </script>
  
  <style scoped>
  .actions {
    border-bottom: 1px solid #e5e7eb;
  }
  </style>
  
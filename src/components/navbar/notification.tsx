"use client";
import {
  readAllNotification,
  readNotification,
} from "@/lib/actions/notification";
import { Bell, X, Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function Notification({
  notifications,
  senders,
}: {
  notifications: {
    id: string;
    message: string;
    userId: string;
    senderId: string;
    read: boolean;
    clinicId: string;
    createdAt: Date;
  }[];

  senders: {
    id: string;
    email: string;
    name: string;
    role: string;
  }[];
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [expandedMessageIndex, setExpandedMessageIndex] = useState<
    number | null
  >(null);
  const [unreadNotifications, setUnreadNotifications] = useState(
    notifications.filter((notification) => !notification.read)
  );

  useEffect(() => {
    setUnreadNotifications(
      notifications
        .filter((notification) => !notification.read)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    );
  }, [notifications]);

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
    setExpandedMessageIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".notification-menu")) {
        closeNotification();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const truncateMessage = (message: string, maxLength: number) => {
    return message.length > maxLength
      ? message.slice(0, maxLength) + "..."
      : message;
  };

  const handleViewFullMessage = (index: number) => {
    setExpandedMessageIndex(index === expandedMessageIndex ? null : index);
  };

  const handleReadMessage = async (id: string) => {
    await readNotification({ id });
    setUnreadNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleReadAllMessage = async ({ userId }: { userId: string }) => {
    await readAllNotification({ userId });
    setUnreadNotifications([]);
  };

  return (
    <div className="notification-menu relative">
      <div className="relative cursor-pointer" onClick={toggleNotification}>
        <Bell className="w-6 h-6" />
        {unreadNotifications.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {unreadNotifications.length}
          </span>
        )}
      </div>
      {isNotificationOpen && (
        <div className="absolute top-10 right-0 w-80 bg-white shadow-lg border border-gray-200 rounded-lg transform transition-all duration-300 ease-in-out">
          <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-lg font-semibold">Повідомелення</h2>
            <button onClick={toggleNotification}>
              <X className="cursor-pointer" />
            </button>
          </div>
          <div className="p-4 max-h-60 overflow-auto">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification, index) => {
                const sender = senders.find(
                  (s) => s.id === notification.senderId
                );
                return (
                  <div key={notification.id} className="mb-4 border-b pb-2">
                    <div>
                      <div className="flex justify-between">
                        <p className="font-semibold">
                          {sender ? sender.name : "Unknown Sender"}
                        </p>
                        <button
                          onClick={() => handleReadMessage(notification.id)}
                          className="ml-2 text-sm font-semibold flex items-center"
                        >
                          <Check className="w-4 h-4 mr-1" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 break-words max-w-full max-h-40 overflow-auto">
                        {expandedMessageIndex === index
                          ? notification.message
                          : truncateMessage(notification.message, 60)}
                      </p>
                    </div>
                    <div>
                      {notification.message.length > 60 && (
                        <button
                          onClick={() => handleViewFullMessage(index)}
                          className="text-sm text-blue-500 hover:text-blue-700 mt-1"
                        >
                          {expandedMessageIndex === index
                            ? "Згорнути"
                            : "Розгорнути"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 text-center">
                Немає нових повідомлень
              </p>
            )}
          </div>
          {unreadNotifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex justify-center">
              <button
                onClick={() =>
                  handleReadAllMessage({
                    userId: notifications[0]?.userId || "",
                  })
                }
                className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
              >
                Переглянути всі непрочитані
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

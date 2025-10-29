"use client";
import React, { useEffect, useRef } from "react";
import ChatsHeader from "@/components/Headers/ChatsHeader";
import ChatCard from "@/components/cards/ChatCard";
import { useChatsStore } from "@/stores/chats/chatsStore";

const dummy = {
  chats: [
    {
      id: 1,
      type: "group",
      title: "Proyecto Alpha",
      last_message: "Hola, ¿Cómo estas?",
      created_by: 3,
      photo_url: "https://i.pravatar.cc/150?img=18",
      created_at: "2025-10-01T10:32:00Z",
    },
    {
      id: 2,
      type: "dm",
      title: "Chat con Laura",
      last_message: "Si no ma",
      created_by: 5,
      photo_url: "https://i.pravatar.cc/150?img=1",
      created_at: "2025-09-28T14:15:00Z",
    },
    {
      id: 3,
      type: "group",
      title: "Equipo Ventas",
      last_message: "Jajaja",
      created_by: 2,
      photo_url: "https://i.pravatar.cc/150?img=4",
      created_at: "2025-09-25T09:45:00Z",
    },
    {
      id: 4,
      type: "group",
      title: "Anuncios Corporativos",
      last_message: "Me parece bien esa opción",
      created_by: 1,
      photo_url: "https://i.pravatar.cc/150?img=5",
      created_at: "2025-09-20T08:00:00Z",
    },
    {
      id: 5,
      type: "dm",
      title: "Cliente: Inmobiliaria Sol",
      last_message: "Este es el menu de la sigueinte semana",
      created_by: 6,
      photo_url: "https://i.pravatar.cc/150?img=6",
      created_at: "2025-09-18T12:20:00Z",
    },
    {
      id: 6,
      type: "group",
      title: "Desarrollo Backend",
      last_message: "Jeje",
      created_by: 4,
      photo_url: "https://i.pravatar.cc/150?img=7",
      created_at: "2025-09-15T16:40:00Z",
    },
    {
      id: 7,
      type: "dm",
      title: "Reunión de Seguimiento",
      last_message: "Adios, cuidate.",
      created_by: 3,
      photo_url: "https://i.pravatar.cc/150?img=8",
      created_at: "2025-09-10T11:10:00Z",
    },
    {
      id: 8,
      type: "group",
      title: "Noticias Internas",
      last_message: "De hecho eso lo conto esta Nancy",
      created_by: 1,
      photo_url: "https://i.pravatar.cc/150?img=9",
      created_at: "2025-09-08T07:55:00Z",
    },
    {
      id: 9,
      type: "group",
      title: "Soporte Técnico",
      last_message: "Iras al concierto la siguiente semana?",
      created_by: 7,
      photo_url: "https://i.pravatar.cc/150?img=10",
      created_at: "2025-09-05T13:25:00Z",
    },
    {
      id: 10,
      type: "dm",
      title: "Chat con Director",
      last_message: "Me lo compras???",
      created_by: 8,
      photo_url: "https://i.pravatar.cc/150?img=11",
      created_at: "2025-09-02T09:00:00Z",
    },
    {
      id: 11,
      type: "group",
      title: "Diseño UX/UI",
      last_message: "Este es la propuesta de la siguiente semana",
      created_by: 9,
      photo_url: "https://i.pravatar.cc/150?img=12",
      created_at: "2025-08-30T15:10:00Z",
    },
    {
      id: 12,
      type: "group",
      title: "Eventos y Actividades",
      last_message: "Juas Juas",
      created_by: 1,
      photo_url: "https://i.pravatar.cc/150?img=13",
      created_at: "2025-08-27T08:45:00Z",
    },
    {
      id: 13,
      type: "dm",
      title: "Proveedor: TechParts",
      last_message: "No puede ser",
      created_by: 10,
      photo_url: "https://i.pravatar.cc/150?img=14",
      created_at: "2025-08-25T10:55:00Z",
    },
    {
      id: 14,
      type: "group",
      title: "Marketing Creativo",
      last_message: "No estaba dormido",
      created_by: 11,
      photo_url: "https://i.pravatar.cc/150?img=15",
      created_at: "2025-08-22T18:30:00Z",
    },
    {
      id: 15,
      type: "dm",
      title: "Chat con Soporte",
      last_message: "¿Ahora que vamos a hacer?",
      created_by: 12,
      photo_url: "https://i.pravatar.cc/150?img=16",
      created_at: "2025-08-20T09:20:00Z",
    },
  ],
};

function ChatsPage() {
  const initialChats = useChatsStore((state) => state.getUserChats);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchInitialChat = async () => {
      try {
        const response = await initialChats('test-9283-xock-2039');
        console.log(response);
      } catch (error) {
        console.log('Error fetching chats:', error);
      }
    };

    fetchInitialChat();
  }, []);

  return (
    <div>
      {/* Header */}
      <ChatsHeader
        onAddNewChat={() => console.log("Nuevo chat")}
        onSearchClick={() => console.log("Buscar")}
        onFilterClick={() => console.log("Filtrar")}
        // rightExtras={<YourProfileAvatar />}
      />
      {/* Chats */}
      <div>
        {dummy.chats.map((item, idx) => (
          <ChatCard
            key={idx}
            ref={ref}
            title={item.title}
            lastMessage={item.last_message}
            timestamp={new Date()} // o "12:45"
            avatarUrl={item.photo_url}
            unreadCount={2}
            selected={false}
            onClick={() => console.log("open chat")}
            locale="es-MX"
          />
        ))}
      </div>
    </div>
  );
}

export default ChatsPage;

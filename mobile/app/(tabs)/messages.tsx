import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { CONVERSATIONS, ConversationType } from "@/data/conversations";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [conversationsList, setConversationsList] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // Delete Conversation
  const deleteConversation = (conversationId: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversationsList((prev) =>
              prev.filter((conv) => conv.id !== conversationId)
            );
          },
        },
      ]
    );
  };

  // Open Chats
  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  // Close Chats
  const closeChatModal = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  // Send Message
  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      setConversationsList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );
      setNewMessage("");

      Alert.alert(
        "Message Sent!",
        `Your message has been sent to: ${selectedConversation.user.name}`
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Messages</Text>

        <TouchableOpacity>
          <Feather name="edit" size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center px-4 py-3 border-gray-100 rounded-full">
          <Feather name="search" size={24} color="#657786" />

          <TextInput
            placeholder="Search for people and groups"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Conversation List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {conversationsList.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            className="flex-row items-center p-4 border-b border-gray-200 active:bg-gray-50"
            onPress={() => openConversation(conversation)}
            onLongPress={() => deleteConversation(conversation.id)}
          >
            {/* Profile Picture */}
            <Image
              source={{ uri: conversation.user.avatar }}
              className="mr-3 rounded-full size-12"
            />

            {/* Basic Data User */}
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <View className="flex-row items-center gap-1">
                  {/* Name */}
                  <Text className="font-semibold text-gray-900">
                    {conversation.user.name}
                  </Text>

                  {/* Is it Verified User? */}
                  {conversation.user.verified && (
                    <Feather
                      name="check-circle"
                      size={16}
                      color="#1DA1F2"
                      className="ml-1"
                    />
                  )}

                  {/* Username */}
                  <Text className="ml-1 text-sm text-gray-500">
                    @{conversation.user.username}
                  </Text>
                </View>

                {/* Conversation Time */}
                <Text className="mr-3 text-sm text-gray-500">
                  {conversation.time}
                </Text>
              </View>
              {/* Last Conversation */}
              <Text className="text-sm text-gray-500">
                {conversation.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View className="px-4 py-2 bg-gray-100 border-t border-gray-100">
        <Text className="text-xs text-center text-gray-500">
          Tap to Open * Long Press to Delete
        </Text>
      </View>

      {/* Modal Chat */}
      <Modal
        visible={isChatOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedConversation && (
          <SafeAreaView className="flex-1">
            {/* Chat Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
              <TouchableOpacity className="mr-3" onPress={closeChatModal}>
                <Feather name="arrow-left" size={24} color="#1DA1F2" />
              </TouchableOpacity>

              {/* Profile Picture */}
              <Image
                source={{ uri: selectedConversation.user.avatar }}
                className="mr-3 rounded-full size-10"
              />

              <View className="flex-1">
                <View className="flex-row items-center">
                  {/* Name of User */}
                  <Text className="mr-1 font-semibold text-gray-900">
                    {selectedConversation.user.name}
                  </Text>

                  {/* Is User Verified? */}
                  {selectedConversation.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" />
                  )}
                </View>

                {/* Username */}
                <Text className="text-sm text-gray-500">
                  @{selectedConversation.user.username}
                </Text>
              </View>
            </View>

            {/* Chat Messages Area */}
            <ScrollView className="flex-1 px-4 py-4">
              <View className="mb-4">
                {/* Beggining of Chat */}
                <Text className="mb-4 text-sm text-center text-gray-400">
                  This is the beginning of your conversation with
                  {selectedConversation.user.name}
                </Text>

                {/* Conversation Meesages */}
                {selectedConversation.messages.map((message) => (
                  <View
                    key={message.id}
                    className={`flex-row mb-3 ${message.fromUser ? "justify-end" : ""}`}
                  >
                    {/* Profile Picture */}
                    {!message.fromUser && (
                      <Image
                        source={{ uri: selectedConversation.user.avatar }}
                        className="mr-2 rounded-full size-8"
                      />
                    )}

                    {/* Meesages */}
                    <View
                      className={`flex-1 ${message.fromUser ? "items-end" : ""}`}
                    >
                      {/* Identifier User who send the message */}
                      <View
                        className={`rounded-2xl px-4 py-3 max-w-xs ${message.fromUser ? "bg-blue-500" : "bg-gray-100"}`}
                      >
                        <Text
                          className={
                            message.fromUser ? "text-white" : "text-gray-900"
                          }
                        >
                          {message.text}
                        </Text>
                      </View>

                      {/* Time */}
                      <Text className="mt-1 text-xs text-gray-400">
                        {message.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Message Container */}
            <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
              {/* Input Message */}
              <View className="flex-row items-center flex-1 px-4 py-3 mr-3 bg-gray-100 rounded-full">
                <TextInput
                  className="flex-1 text-base"
                  placeholder="Start a message..."
                  placeholderTextColor="#657786"
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
              </View>

              {/* Button Send Message */}
              <TouchableOpacity
                onPress={sendMessage}
                className={`size-10 rounded-full items-center justify-center ${
                  newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
                }`}
                disabled={!newMessage.trim()}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessagesScreen;

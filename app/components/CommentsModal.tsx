import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useInteractionStore, useComments, useCommentsLoading } from '../store/useInteractionStore';

interface CommentsModalProps {
  isVisible: boolean;
  onClose: () => void;
  contentId: string;
  contentTitle: string;
}

export default function CommentsModal({
  isVisible,
  onClose,
  contentId,
  contentTitle,
}: CommentsModalProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    addComment,
    loadComments,
    toggleCommentLike,
  } = useInteractionStore();

  const comments = useComments(contentId);
  const isLoading = useCommentsLoading(contentId);

  // Load comments when modal opens
  useEffect(() => {
    if (isVisible && comments.length === 0) {
      loadComments(contentId);
    }
  }, [isVisible, contentId, comments.length, loadComments]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    try {
      await addComment(contentId, newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('Error', 'Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    try {
      await toggleCommentLike(commentId, contentId);
    } catch (error) {
      console.error('Error liking comment:', error);
      Alert.alert('Error', 'Failed to like comment. Please try again.');
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffMs = now.getTime() - commentTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return commentTime.toLocaleDateString();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-lg font-rubik-semibold text-gray-900">
              Comments
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Content Title */}
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <Text className="text-sm text-gray-600 font-rubik" numberOfLines={2}>
              {contentTitle}
            </Text>
          </View>

          {/* Comments List */}
          <ScrollView 
            className="flex-1 px-4"
            showsVerticalScrollIndicator={false}
          >
            {isLoading && comments.length === 0 ? (
              <View className="flex-1 justify-center items-center py-20">
                <ActivityIndicator size="large" color="#FEA74E" />
                <Text className="text-gray-500 mt-2 font-rubik">Loading comments...</Text>
              </View>
            ) : comments.length === 0 ? (
              <View className="flex-1 justify-center items-center py-20">
                <Ionicons name="chatbubble-outline" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 mt-4 font-rubik text-center">
                  No comments yet.{'\n'}Be the first to comment!
                </Text>
              </View>
            ) : (
              <View className="py-4">
                {comments.map((comment) => (
                  <View key={comment.id} className="mb-4 pb-4 border-b border-gray-100">
                    <View className="flex-row items-start">
                      {/* Avatar */}
                      <View className="w-8 h-8 rounded-full bg-gray-300 mr-3 overflow-hidden">
                        {comment.userAvatar ? (
                          <Image 
                            source={{ uri: comment.userAvatar }} 
                            className="w-full h-full"
                            resizeMode="cover"
                          />
                        ) : (
                          <View className="w-full h-full bg-gray-400 justify-center items-center">
                            <Text className="text-white text-xs font-rubik-semibold">
                              {comment.username?.[0]?.toUpperCase() || 'U'}
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* Comment Content */}
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                          <Text className="font-rubik-semibold text-gray-900 text-sm">
                            {comment.username || 'Anonymous'}
                          </Text>
                          <Text className="text-gray-500 text-xs ml-2 font-rubik">
                            {formatTimeAgo(comment.timestamp)}
                          </Text>
                        </View>
                        
                        <Text className="text-gray-800 text-sm font-rubik leading-5">
                          {comment.comment}
                        </Text>

                        {/* Comment Actions */}
                        <View className="flex-row items-center mt-2">
                          <TouchableOpacity
                            onPress={() => handleCommentLike(comment.id)}
                            className="flex-row items-center mr-4"
                          >
                            <Ionicons 
                              name="heart" 
                              size={16} 
                              color={comment.likes > 0 ? "#EF4444" : "#9CA3AF"} 
                            />
                            <Text className="text-gray-500 text-xs ml-1 font-rubik">
                              {comment.likes}
                            </Text>
                          </TouchableOpacity>
                          
                          <TouchableOpacity className="flex-row items-center">
                            <Ionicons name="chatbubble-outline" size={14} color="#9CA3AF" />
                            <Text className="text-gray-500 text-xs ml-1 font-rubik">
                              Reply
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Comment Input */}
          <View className="border-t border-gray-200 bg-white">
            <View className="flex-row items-end p-4 space-x-3">
              <View className="flex-1">
                <TextInput
                  value={newComment}
                  onChangeText={setNewComment}
                  placeholder="Add a comment..."
                  multiline
                  maxLength={500}
                  className="border border-gray-300 rounded-lg px-3 py-2 max-h-20 font-rubik text-sm"
                  style={{ textAlignVertical: 'top' }}
                />
                <Text className="text-right text-xs text-gray-400 mt-1 font-rubik">
                  {newComment.length}/500
                </Text>
              </View>
              
              <TouchableOpacity
                onPress={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
                className={`px-4 py-2 rounded-lg ${
                  newComment.trim() && !isSubmitting
                    ? 'bg-[#FEA74E]'
                    : 'bg-gray-300'
                }`}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons 
                    name="send" 
                    size={16} 
                    color={newComment.trim() ? "white" : "#9CA3AF"} 
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
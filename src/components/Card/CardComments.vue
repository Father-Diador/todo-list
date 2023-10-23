<template>
    <div class="comments">
        <span>Комментарии:</span>
        <div v-if="card.status != 2" class="comments__wrapper">
          <input 
            type="text" 
            v-model="comment"
            placeholder="Введите комментарий"
            class="comments__input"
            @click.stop
          >
          <button
            class="comments__btn"
            @click.stop="addComment"
          >+</button>
        </div>
        <div class="comments__comments" v-if="cardComments.length">
            <div
                v-if="showComments"
                class="comments__comments__wrapper"
            >
                <div
                    v-for="comment in cardComments"
                    :key="comment.id"
                    class="comments__comments-list"
                >
                    <div class="comments__comments-list__date search-word">
                        {{ comment.date }}
                    </div>
                    <div class="comments__comments-list__text search-word">
                        {{ comment.value }}
                    </div>
                </div>
            </div>
            <span
                @click.stop="showCommentsFunc"
                class="comments__comments__show-btn btn-default"
            >{{ commentsBtn }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useCards } from "@/stores/useCards";

const props = defineProps(['card', 'cardComments']);

const commentsBtn = ref('Показать комментарии');
const showComments = ref(false);

const showCommentsFunc = () => {
    showComments.value = !showComments.value;
    if (showComments.value) {
        commentsBtn.value = 'Скрыть комментарии';
    } else {
        commentsBtn.value = 'Показать комментарии';
    }
};

const cardsStore = useCards();
const { setComment } = cardsStore;

const comment = ref(null);
const addComment = () => {
  if (!comment.value.length) {
    return;
  }
  let params = { comment: comment.value, card_id: props.card.id }
  setComment(params);
  comment.value = null;
};
</script>

<style lang="scss" scoped>
.comments {
    padding: 20px 20px 10px 20px;
    border-top: 1px solid $line;

    &__wrapper {
      display: flex;
      flex-direction: row;
      gap: 10px;
      margin: 20px 0;
    }

    &__input {
      width: 100%;
      padding: 15px 10px;
      border: 1px solid #dbdbdb;
      border-radius: 10px;
      outline: none;
      box-sizing: border-box;
    }

    &__btn {
      cursor: pointer;
      border-radius: 10px;
      padding: 10px 20px;
      border: none;
      background: $accent;
      color: $white;
      font-size: 20px;

      &:hover {
        background: $accent-hover;
      }
    }

    &__comments {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        &__show-btn {
            display: inline;
        }

        &__wrapper {
            width: 100%;
        }
    }

    &__comments-list {
        width: 100%;
        word-break: break-all;

        &:not(:last-child) {
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #dbdbdb;
        }

        &__date {
            margin-bottom: 10px;
            font-size: 14px;
        }

        &__text {
            font-size: 16px;
        }
    }
}
</style>
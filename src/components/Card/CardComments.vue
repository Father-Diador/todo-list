<template>
    <div v-if="card.status != 2" class="comments">
        <span>Комментарии:</span>
        <div class="comments__wrapper">
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
        <div class="comments__comments" v-if="cardComments">
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
            <!-- <span
                @click.stop="showCommentsFunc"
                class="comments__comments__show-btn btn-default"
            >{{ commentsBtn }}</span> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import http from '@/js/http';
import { useLocalCards } from "@/stores/useLocalCards";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import { useCards } from "@/stores/useCards";

const allCardsStore = useCards();
const { setCards } = allCardsStore;

const props = defineProps(['card', 'cardComments']);

const showComments = ref(true);

// const commentsBtn = ref('Показать комментарии');

// const showCommentsFunc = () => {
//     showComments.value = !showComments.value;
//     if (showComments.value) {
//         commentsBtn.value = 'Скрыть комментарии';
//     } else {
//         commentsBtn.value = 'Показать комментарии';
//     }
// };

const cardsStore = useLocalCards();
const { setComment } = cardsStore;

const comment = ref(null);
const addComment = () => {
  if (!comment.value.length) {
    return;
  }
  if (props.card.isLocale) {
    let params = { comment: comment.value, card_id: props.card.id }
    setComment(params);
  } else {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    today = year + '-' + month + '-' + day;

    let params = { id: Date.now(), date: today, value: comment.value };

    props.card.comments.push(params);
    http.editCard(props.card.id, props.card, (res) => {
      if (res.error) {
        createToast("Error!", {
          type: "danger",
        });
      } else {
        createToast("Success!", {
          type: "success",
        });
        http.getCards((res) => {
          setCards(res);
        });
      }
    });
  }
  comment.value = null;
};
</script>

<style lang="scss" scoped>
.comments {
    padding: 20px 0;
    border-top: 1px solid $line;
    width: 100%;

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
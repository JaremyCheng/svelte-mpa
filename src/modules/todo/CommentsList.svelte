<script>
  import { fly } from 'svelte/transition';
  export let comments = [];
  export let finish = [];
  function handleComment(idx) {
    let delContent = comments[idx];
    comments.splice(idx, 1);
    comments = comments;
    finish.push(delContent);
    finish = finish;
  }
  function handleCancle(idx) {
    console.log(idx);
    let delContent = finish[idx];
    finish.splice(idx, 1);
    finish = finish;
    comments.push(delContent);
    comments = comments;
  }
</script>

<div class="comments-list">
  <div class="comments-item">
    <p>Doing...</p>
    {#if comments.length === 0}
      <div class="empty-tip">想想你要做点什么...</div>
    {/if}
    {#each comments as content, i (i)}
      <div
        in:fly={{ y: 100, duration: 500 }}
        on:click|preventDefault|stopPropagation={handleComment(i)}
        class="list-item">
        <div class="list-item-content">{content}</div>
      </div>
    {/each}
  </div>
  <div class="comments-item">
    <p>Finish</p>
    {#if finish.length === 0}
      <div class="empty-tip">你现在一无所成...</div>
    {/if}
    {#each finish as content, i (i)}
      <div
        in:fly={{ y: 100, duration: 500 }}
        on:click|preventDefault|stopPropagation={handleCancle(i)}
        class="list-item list-item-finish">
        <div class="list-item-content">{content}</div>
      </div>
    {/each}
  </div>
</div>

<style lang="less">
  .comments-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    .comments-item {
      margin-top: 30px;
      .empty-tip {
        width: 100%;
        color: #eaeaea;
      }
      .list-item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 5px 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        &.list-item-finish {
          background: #eaeaea;
          text-decoration: line-through;
        }
      }
    }
  }
</style>

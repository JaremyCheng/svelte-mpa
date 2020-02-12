<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let newContent = '';
  function addComment() {
    if (!newContent) return;
    dispatch('add', {
      comment: newContent,
    });
  }
</script>

<div class="input-field">
  <input type="text" placeholder="请输入内容" bind:value={newContent} />
  <button on:click={addComment} class="commit-btn">提交</button>
</div>

<style lang="less">
  .input-field {
    input {
      padding: 10px;
      width: 300px;
    }
    .commit-btn {
      width: 100px;
      height: 40px;
    }
  }
</style>

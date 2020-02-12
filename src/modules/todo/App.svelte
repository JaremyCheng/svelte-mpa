<script>
  import InputField from './InputField';
  import CommentsLIst from './CommentsList';
  let comments = ['svelte', 'React', 'Vue'];
  let finish = ['HTML', 'CSS', 'Javascript'];
  function handleAdd(event) {
    console.log(event.detail.comment);
    comments = [...comments, event.detail.comment];
  }
</script>

<main>
  <InputField on:add={handleAdd} />
  <CommentsLIst {comments} {finish} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

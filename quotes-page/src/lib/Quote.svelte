<script>
  let promise = getQuote();

  async function getQuote() {
    const response = await fetch(`https://get-quotes-worker.fabian-diemand.workers.dev/api/rnd-quote`);
    const result = await response.json();

    if (response.ok) {
        return result.quote;
    } else {
      throw new Error(response.statusText);
    }
  }
</script>

<div>
{#await promise}
	<p>...Zitat wird geladen</p>
{:then quote}
	<p class="quote">{quote.quote}</p>
  <hr/>
  <p class="author">{quote.author}</p>
{:catch error}
	<p style="color: red">Leider ist ein Fehler aufgetreten. Bitte versuche es später nochmal.</p>
{/await}
</div>
<style>
  hr {
    width: 20px;
  }
  .author {
    font-style: italic;
  }
</style>
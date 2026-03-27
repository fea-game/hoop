<script lang="ts">
  import { game } from '$lib/store.svelte.js';
  import DraftScreen from './draft/DraftScreen.svelte';
  import ChainScreen from './chain/ChainScreen.svelte';
  import MatchScreen from './match/MatchScreen.svelte';
</script>

{#if game.screen === 'draft'}
  <DraftScreen />
{:else if game.screen === 'chain'}
  <ChainScreen />
{:else if game.screen === 'match' || game.screen === 'summary'}
  <MatchScreen />
{/if}

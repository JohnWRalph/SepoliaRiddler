<script lang="ts">
      import { alertLink, alertMessage, alertState } from "../store/alert";
</script>

{#if $alertState === "success"}
  <div class="alert alert-success">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <span class="alert-message"
      >{$alertMessage}
      <a target="_blank" rel="noreferrer" href={$alertLink}>
        {$alertLink}
      </a>
    </span>
  </div>
{:else if $alertState === "error"}
  <div class="alert alert-error">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      /></svg
    >
    <span class="alert-message"
      >{$alertMessage}
      <a target="_blank" rel="noreferrer" href={$alertLink}>
        {$alertLink}
      </a></span
    >
  </div>
{:else if $alertState === "warning"}
  <div class="alert alert-warning">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      /></svg
    >
    <span class="alert-message"
      >{$alertMessage}
      <a target="_blank" rel="noreferrer" href={$alertLink}>
        {$alertLink}
      </a></span
    >
  </div>
{/if}

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  
    .alert {
      position: fixed;
      top: 50px;
      left: 15%;
  
      z-index: 1000;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70%;
    }
    .alert-message {
      display: flex;
      flex-direction: column;
      word-break: break-all;
    }
  </style>
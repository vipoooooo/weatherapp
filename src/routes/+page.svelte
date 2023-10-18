<script lang="ts">
	import { Search, CloudRain, Snowflake, Cloudy, Droplet, Wind, CloudCog } from 'lucide-svelte';

	const apiKey = '9ab588f117ec59b8109d0dfe04c8c658';
	let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

	let errBool = false;

	let locationValue: string = '';

	let temp: number; // Initialize temp to 0
	let location: string;
	let humidity: number;
	let windSpeed: number;

	let icon = '';

	async function checkWeather(locate: string) {
		const res = await fetch(`${apiUrl}&q=${locate}&appid=${apiKey}`);
		if (res.status != 200) {
			errBool = true;
			console.log(res.status);
			console.log(locationValue);
		} else {
			const data = await res.json();
			temp = data.main.temp;
			location = data.name;
			humidity = data.main.humidity;
			windSpeed = data.wind.speed;
			icon = data.weather[0].main;
			errBool = false;

			console.log(res.status);
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault(); // Prevent the form's default behavior
		checkWeather(locationValue);
	}

	$: {
		// Reset errBool if the location value changes
		errBool = false;
	}
</script>

<div class="p-10 flex flex-col gap-5">
	<p>weather app</p>
	<form method="POST" on:submit={handleSubmit} class="flex">
		<label>
			<input bind:value={locationValue} type="text" class="bg-slate-200" placeholder="location" />
		</label>

		<button type="submit" class="hover:text-gray-600"><Search /></button>
	</form>

	{#if locationValue == ''}
		please enter location
	{:else if errBool}
		<p class="text-red-500">location not found</p>
	{:else}
		<div class="flex flex-col gap-3 w-fit">
			<div class=" bg-slate-300 p-3 w-full">
				{#if icon == 'Rain'}
					<CloudRain />
				{:else if icon == 'Snow'}
					<Snowflake />
				{:else if icon == 'Clouds'}
					<Cloudy />
				{:else}
					<CloudCog />
				{/if}
				<p>{temp}°C</p>
				<p>{location}</p>
			</div>

			<div class="flex gap-3">
				<div class=" bg-blue-300 p-3 w-fit">
					<Droplet />
					<p>{humidity}%</p>
					<p>Humidity</p>
				</div>

				<div class=" bg-red-300 p-3 w-fit">
					<Wind />
					<p>{windSpeed} m/s</p>
					<p>Wind Speed</p>
				</div>
			</div>
		</div>
	{/if}
</div>

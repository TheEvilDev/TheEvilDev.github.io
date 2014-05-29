---
title: Solving Euler Problems in F# - 001
tags: fsharp euler
---
In my quest to master everything there is to know about functional programming and F#, today I start working through the "Euler Problems"

The first problem is pretty basic, so I won't talk to much on it, but the problem we're trying to solve:

> If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
> Find the sum of all the multiples of 3 or 5 below 1000.

This kind of problem is exactly what functional languages are designed to solve, and in a very basic one liner, we have our F# solution:

	let answer = [1..999] |> Seq.where(fun x -> x % 3 = 0 || x % 5 = 0) |> Seq.sum
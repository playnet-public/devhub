## PlayNet DevHub

This project provides a new platform for developers to share, exchange and discuss knowledge.

## Why

This idea has been discussed a lot inside PlayNet and we had so many ideas about what to do with it.
We know there are a lot of communities out there where developers group up and exchange their ideas and experiences.
Many of those places are discussion boards and due to their nature it becomes hard to keep the knowledge clean and findable after finishing the discussion (if even).

With the DevHub Project we aim for a new aproach to collect the knowledge that is being discussed on said platforms and bring it together while still linking to the original sources and allowing curated updates.

Additional to this we aim to provide a place to not only share knowledge but also to teach. Tutorials are a key part of learning and while some discussion boards already include some features regarding this, we strafe to do better.

Judging our idea you could make it easy on yourself and call us "another wiki software". Might be true, we'll see.
This is a community project and we will see where the community guides us.

## Frontend and Backend

This project consists of currently combined backend and frontend projects.
The initial work here will merely be a prototype for what we plan to further outline ideas and attract potential contributors and partners.
Therefor development will at first only take place on the frontend part.
We got several ideas on how to do the backend part, but it might end with some quite primitive setup using e.g. ponzu.

Front and Backend result in seperate Docker Images and can be built by calling:
`make buildbackend` and `make buildfrontend`
(subject to be changed)

## Coding and Style

Coding is done using pull requests and code reviews.
Our code is always checked by Travis using `make test check` therefor all Golang rules on syntax and formating have to be met for pull requests to be merged.
While this might incur more work for possible contributors, we see the code produced here as production critical once finished and therefor strive for high code quality.

The team is developing this mostly using TDD and BDD. If you don't know what this is, we recommend this [video](https://www.youtube.com/watch?v=uFXfTXSSt4I) for starters.

Please do reasonable commit sizes.

## Dependencies
All dependencies inside this project are being managed by [dep](https://github.com/golang/dep) and are checked in.
After pulling the repository, it should not be required to do any further preparations aside from `make deps` to prepare the dev tools (once).

If new dependencies get added while coding, make sure to add them using `dep ensure --add "importpath"` and to check them into git.
We recommend adding your vendor changes in a separate commit to make reviewing your changes easier and faster.

## Testing
To run tests you can use:
```bash
make test
```

## Contributing

Feedback and contributions are highly welcome. Feel free to file issues, feature or pull requests.
If you are interested in using this project now or in a later stage, feel free to get in touch.
If you already got a developer centric communinity and would like to colaborate and help making the art of software development better, please get in touch.

We are always looking for active contributors, team members and partner projects sharing our vision.
Easiest way of reaching us is via [Discord](https://discord.gg/dWZkR6R).

See you soon,
the PlayNet Team.

## Attributions

* [Kolide for providing `kit`](https://github.com/kolide/kit)

## License

The projects license can be found inside [LICENSE](LICENSE).
Copyright by play-net.org - 2018
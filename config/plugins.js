module.exports = ({ env }) => ({
  // ...
  io: {
    enabled: true,
    config: {
      // This will listen for all supported events on the article content type
      contentTypes: ["api::message.message"],
      events: [
        {
          name: "message.message",
          handler: ({ strapi }, socket, name) => {
            strapi.log.info(`[io] trigger update for socket ${socket.id}.`);

            // update the respective users name.
            strapi.entityService.update(
              "plugin::users-permissions.user",
              socket.id,
              {
                data: {
                  name,
                },
              }
            );
          },
        },
      ],
    },
  },
  // ...
});

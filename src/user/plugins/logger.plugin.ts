/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApolloServerPlugin } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';

@Plugin()
export class LoggerPlugin implements ApolloServerPlugin {
  async requestDidStart() {
    console.log('Request started');
    const requestStartTime = Date.now();

    return {
      async willSendResponse(requestContext) {
        const totalDuration = Date.now() - requestStartTime;
        const middlewareData = requestContext.contextValue.middlewareData;

        console.log('📊 === REQUEST SUMMARY ===');
        console.log(`⏱️  Total request time: ${totalDuration}ms`);

        if (middlewareData) {
          console.log(
            `🔢 Total fields resolved: ${middlewareData.totalFields}`,
          );
          console.log(`⚡ Field timings:`);

          // Show slowest fields
          const slowestFields = middlewareData.fieldTimings
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 5); // Top 5 slowest

          slowestFields.forEach((field, index) => {
            console.log(
              `  ${index + 1}. ${field.fieldName}: ${field.duration}ms`,
            );
          });

          // Calculate total field resolution time
          const totalFieldTime = middlewareData.fieldTimings.reduce(
            (sum, field) => sum + field.duration,
            0,
          );
          console.log(`🔥 Total field resolution time: ${totalFieldTime}ms`);
        } else {
          console.log('❌ No middleware data found');
        }

        console.log('✅ Response sent');
        console.log('═'.repeat(50));
      },
    };
  }
}

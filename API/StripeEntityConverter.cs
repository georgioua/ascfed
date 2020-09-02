using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Stripe;

namespace API
{

    public class StripeEntityConverter : JsonConverter<StripeEntity>
    {
        public override StripeEntity Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options) =>
                (StripeEntity)StripeEntity.FromJson(reader.GetString());

        public override void Write(
            Utf8JsonWriter writer,
            StripeEntity stripeEntity,
            JsonSerializerOptions options) =>
                writer.WriteStringValue(stripeEntity.ToJson());
    }
}

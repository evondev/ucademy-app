import createUser from "@/lib/actions/user.actions";
import { Webhook } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "your-secret";

export async function POST(req: Request) {
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  const body = await req.text();

  const sivx = new Webhook(webhookSecret);

  let msg: any;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  const event = msg.event;
  if (event.type === "user.created") {
    await createUser({
      clerkId: event.payload.id,
      username: event.payload.username,
      email_address: event.payload.email_addresses[0].email_address,
      name: event.payload.username,
      avatar: event.payload.image_url,
    });
  }

  return new Response("OK", { status: 200 });
}

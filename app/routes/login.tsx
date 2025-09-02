import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/loaders-demo";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";

import { z } from "zod";
import { parseWithZod } from "@conform-to/zod/v4";

const schema = z.object({
  email: z.email("Por favor, insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
})

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const submission = parseWithZod(formData, { schema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  await new Promise(resolve => setTimeout(resolve, 3000));


  return redirect('/loaders')
}

export default function ({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher()

  const busy = fetcher.state !== 'idle'

  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema })
    }
  })

  return (
    <>
      <fetcher.Form {...getFormProps(form)} className="max-w-sm mx-auto mt-8 p-4 border rounded shadow flex flex-col gap-4" method="POST">
        <h1>login</h1>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            {...getInputProps(fields.email, { type: 'email' })}
            className="w-full border rounded px-3 py-2"
            placeholder="seu@email.com"
            required
          />
          {fields.email.errors ? (
            <div className="text-red-500">{fields.email.errors}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Senha
          </label>
          <input
            {...getInputProps(fields.password, { type: 'password' })}
            className="w-full border rounded px-3 py-2"
            placeholder="Sua senha"
            required
          />

          {fields.password.errors ? (
            <div className="text-red-500">{fields.password.errors}</div>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={busy}
          className="disabled:opacity-25 disabled:bg-gray-700 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </fetcher.Form>
    </>
  );
}

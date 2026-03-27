import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertEnrollment, type InsertContactMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCourses(search?: string, category?: string) {
  return useQuery({
    queryKey: [api.courses.list.path, search, category],
    queryFn: async () => {
      const url = new URL(api.courses.list.path, window.location.origin);
      if (search) url.searchParams.append("search", search);
      if (category) url.searchParams.append("category", category);
      
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch courses");
      return api.courses.list.responses[200].parse(await res.json());
    },
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: [api.courses.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.courses.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch course");
      return api.courses.get.responses[200].parse(await res.json());
    },
  });
}

export function useInstructors() {
  return useQuery({
    queryKey: [api.instructors.list.path],
    queryFn: async () => {
      const res = await fetch(api.instructors.list.path);
      if (!res.ok) throw new Error("Failed to fetch instructors");
      return api.instructors.list.responses[200].parse(await res.json());
    },
  });
}

export function useEnroll() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertEnrollment) => {
      const res = await fetch(api.enroll.create.path, {
        method: api.enroll.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
           const error = api.enroll.create.responses[400].parse(await res.json());
           throw new Error(error.message);
        }
        throw new Error("Failed to enroll");
      }
      return api.enroll.create.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

export function useContact() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
           const error = api.contact.create.responses[400].parse(await res.json());
           throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

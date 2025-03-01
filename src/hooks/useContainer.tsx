import { useQuery } from "react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Module } from "@/dtos/configuration/create-configuration.dto";
import { containerService } from "@/services/container.service";

const TAGS_QUERY_KEY = "tags";

export const useContainer = (query?: { repositoryName: Module }) => {
    const [tags, setTags] = useState<string[]>([]);

    const fetchTags = async (repositoryName: Module): Promise<string[]> => {
        return await containerService.getTags(repositoryName);
    };

    const { isLoading: isTagsLoading, isError: isTagsError } = useQuery({
        queryKey: [TAGS_QUERY_KEY, query],
        queryFn: async () => {
            try {
                if (query) {
                    const tags = await fetchTags(query.repositoryName);
                    setTags(tags);
                    return tags;
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error);
                    toast.error("Error fetching tags");
                }
            }
        },
    });

    return {
        tags,
        isTagsLoading,
        isTagsError,
    };
};

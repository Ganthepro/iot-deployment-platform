import { useContainer } from "@/hooks/useContainer";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Module } from "@/dtos/configuration/create-configuration.dto";

interface SelectContainerProps {
    repositoryName: Module;
    handleTag: (tag: string) => void;
}

export default function SelectTag({
    repositoryName,
    handleTag,
}: SelectContainerProps) {
    const { tags, isTagsLoading, isTagsError } = useContainer({
        repositoryName,
    });

    return (
        <Select onValueChange={handleTag}>
            <SelectTrigger>
                <SelectValue placeholder="Select a Tag" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tag</SelectLabel>
                    {isTagsLoading ? (
                        <SelectItem value="loading">Loading...</SelectItem>
                    ) : isTagsError ? (
                        <SelectItem value="error">
                            Error fetching tags
                        </SelectItem>
                    ) : (
                        tags.map((tag) => (
                            <SelectItem key={tag} value={tag}>
                                {tag}
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import restClient from "../../util/rest.util";

const mockDirectory: any = [
    {
        type: "directory",
        name: "Meeting 1",
        owner: "Alex",
        lastModified: "01/01/2024",
        contents: [
            {
                type: "directory",
                name: "Drawings",
                owner: "Nyan",
                lastModified: "01/01/2024",
                contents: [
                    {
                        type: "file",
                        name: "Drawing 1",
                        owner: "Picasso",
                        lastModified: "01/01/2024"
                    }
                ]
            },
            {
                type: "file",
                name: "Meeting Minutes",
                owner: "Justin",
                lastModified: "01/01/2024"
            }
        ]
    },
    {
        type: "directory",
        name: "Meeting 2",
        owner: "Elijah",
        lastModified: "01/01/2024",
        contents: [
            {
                type: "file",
                name: "Meeting Minutes",
                owner: "Amanda",
                lastModified: "01/01/2024",
            }
        ]
    },
    {
        type: "file",
        name: "Work Log",
        owner: "Chloe",
        lastModified: "01/01/2024",
    },
    {
        type: "file",
        name: "Scratch Paper",
        owner: "Ivan",
        lastModified: "01/01/2024",
    }
];

const DriveTab: React.FC = () => {
    const [currPath, setCurrPath] = useState<string[]>([]);
    const [currDirectory, setCurrDirectory] = useState<any>(mockDirectory);

    const {projectId} = useParams();

    const handleRootClick = () => {
        // This should just be whatever the root directory is (however you want to send back to root)
        setCurrDirectory(mockDirectory);
        setCurrPath([]);
    }

    const moveToSubdirectory = (entry: any) => {
        setCurrDirectory(entry.contents);
        setCurrPath([...currPath, entry.name]);
    }

    const uploadFileToDir = async (e) => {
        e.preventDefault();
    }

    const getProjectFiles = async (e) => {
        e.preventDefault();
        console.log("ATTEMPTING CALL");
        const projectFiles = await restClient.get(`/projects/${projectId}/files`)
        console.log(projectFiles);
    }

    return (
        <div className="bg-white rounded-xl p-6">
            <div className="flex items-center mb-4">
                <h1 className="text-xl font-semibold mr-2" onClick={handleRootClick}>Project Files</h1>
                {currPath.map((i: any) => ` > ${i}`)}
            </div>
            <div className="flex mb-4">
                <div className="w-3/5">Name</div>
                <div className="w-2/6">Owner</div>
                <div className="w-1/5">Last Modified</div>
            </div>
            <div className="border-b border-gray-200 mb-4" />
            <div className="flex flex-col">
                {currDirectory.map((entry: any, index: number) => (
                    <React.Fragment key={index}>
                        <div className="flex items-center mb-2">
                            <span className="w-3/5" onClick={entry.type === "directory" ? () => moveToSubdirectory(entry) : () => {}}>
                                {entry.type === "directory" ? <FolderIcon /> : <ArticleIcon />}
                                {"  " + entry.name}
                            </span>
                            <span className="w-2/6">{entry.owner}</span>
                            <span className="w-1/5">{entry.lastModified}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DriveTab;
